const namespace = ['space:dpi-store-lease-validator']
import api from '@flatfile/api'
import { recordHook } from '@flatfile/plugin-record-hook'
import { exportWorkbookPlugin } from '@flatfile/plugin-export-workbook'
import { blueprint } from './blueprint'
import { autocast } from "@flatfile/plugin-autocast"

export default function flatfileEventListener(listener) {
  listener.on('**', (event) => {
    console.log('Event Received: ' + event.topic);
  })

  listener.namespace(namespace, (namespacedEvents) => {
    namespacedEvents.filter({ job: 'space:configure' }, (configure) => {
      configure.on(
        'job:ready',
        async ({ context: { spaceId, environmentId, jobId } }) => {
          try {
            await api.jobs.ack(jobId, {
              info: 'Creating Space',
              progress: 10,
            })

            await api.workbooks.create({
              spaceId,
              environmentId,
              ...blueprint,
            })

            await api.jobs.complete(jobId, {
              outcome: {
                message: 'Space Created',
                acknowledge: true,
              },
            })
          } catch (error) {
            await api.jobs.fail(jobId, {
              outcome: {
                message:
                  'Space Creation Failed. See Event Logs',
                acknowledge: true,
              },
            })
          }
        }
      )
    })
    namespacedEvents.use(autocast("in", ["SCCompanyID", "SCPropertyID", "Active","IcscMinorRetailCode","SpecialtyLeasingMinorCode", "SquareFeet", "NonSalesReporting","InitialSalesDueDay", "AnnualCertifiedSalesDueDay", "AnnualMinimumRent", "Breakpoint", "PercentageRentRate", "CAMExpenseRecovery","StoreRemodeled","TenantAllowanceProvided", "TenantAllowanceAmount"]))

    namespacedEvents.use(
      recordHook("in", (record) => {
        // skip SCCompanyID - let autocast plugin handle
        // skip StoreName - string
        // skip StoreNumber - number or string
        // skip LeaseNumber - number or string
        // skip SCPropertyID - let autocast plugin handle
        // skip PropertyName - string
        // skip ParentRetailerName - string
        // skip ContactName - string
        // skip ContactTitle - string
        // skip Active - let autocast handle
        // skip IcscMinorRetailCode - not required,autocasting plugin handles the logic
        
        // skip Permanence logic - enum should handle it
        const tenantPermanence = record.get("Permanence")

        const squareFeet = record.get("SquareFeet")
        if (!squareFeet > 0) {
          record.addError("SquareFeet", "Must be greater than 0")
        }

        // skip SpaceType - enum should handle it
        // skip SpaceNumber - string
        // skip Floor - not required and enum should handle it

        const nonSalesReporting = record.get("NonSalesReporting")

        const reportingFrequency = record.get("ReportingFrequency")
        if (nonSalesReporting === 0 && reportingFrequency === "" || reportingFrequency === null) {
          record.addError("ReportingFrequency", "ReportingFrequency is required")
        }
        
        const initialSalesDueDay = record.get("InitialSalesDueDay")
        if (nonSalesReporting === 0 && initialSalesDueDay === "" ||initialSalesDueDay === null) {
          record.addError("InitialSalesDueDay", "InitialSalesDueDay is required")
        } else if (initialSalesDueDay <= 0 || initialSalesDueDay > 28) {
          record.addError("InitialSalesDueDay", "Must be a number between 1 and 28")
        }

        // skip AnnualCertifiedSalesDueDay - autocast plugin should handle it for now


        // Placing LeaseExpirationDate here, out of order, to test open date
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        const leaseExpirationDate = record.get("LeaseExpirationDate")
        const compareLEXD = new Date(leaseExpirationDate)
        if (!dateRegex.test(leaseExpirationDate)) {
          record.addError("LeaseExpirationDate", "Invalid date format")
        }

        // Placing OpenDate here, out of order, to test LeaseEffectiveDate
        const openDate = record.get("OpenDate")
        const compareOD = new Date(openDate)
        if (!dateRegex.test(openDate)) {
          record.addError("OpenDate", "Invalid date format")
        } else if (compareOD > compareLEXD) {
          record.addError("OpenDate", "OpenDate cannot be after LeaseExpirationDate")
        }

        const leaseEffectiveDate = record.get("LeaseEffectiveDate")
        const compareLED = new Date(leaseEffectiveDate)
        if (!dateRegex.test(leaseEffectiveDate)) {
          record.addError("LeaseEffectiveDate", "Invalid date format")
        } else if (compareLED > compareOD) {
          record.addError("LeaseEffectiveDate", "Cannot be after store OpenDate")
        }
        
        const leaseYearEndDate = record.get("LeaseYearEndDate")
        if (tenantPermanence === "Permanent" && leaseYearEndDate === "" || leaseYearEndDate === null) {
          record.addError("LeaseYearEndDate", "LeaseYearEndDate is required")
        } else if (!dateRegex.test(leaseYearEndDate)) {
          record.addError("LeaseYearEndDate", "Invalid date format")
        }

        const closeDate = record.get("CloseDate")
        let compareCD = new Date(closeDate)
        let currentDate = new Date()
        if (closeDate === null || closeDate === "") {
          //
        } else if (!dateRegex.test(closeDate)) {
          record.addError("CloseDate", "Invalid date format")
        } else if (compareCD <= compareOD || compareCD > currentDate) {
          record.addError("CloseDate", "CloseDate must be within open date and current date")
        }

        const annualMinimumRent = record.get("AnnualMinimumRent")
        if (tenantPermanence === "Temporary" && annualMinimumRent !== null) {
          record.addWarning("AnnualMinimumRent", "Blank for temporary tenants")
        }

        // skip Breakpoint - not required, autocast plugin should handle it
        // skip PercentageRentRate - not required, autocast plugin should handle it
        
        
        const camExpenseRecovery = record.get("CAMExpenseRecovery")
        if (tenantPermanence === "Temporary" && camExpenseRecovery !== null) {
          record.addWarning("CAMExpenseRecovery", "Blank for temporary tenants")
        }
        // skip StoreRemodeled - enum should handle it

        const storeRemodeledDate = record.get("StoreRemodeledDate")
        if (storeRemodeledDate === null || storeRemodeledDate === "") {

        } else if (!dateRegex.test(storeRemodeledDate)) {
          record.addError("StoreRemodeledDate", "Invalid date format")
        }

        // skip TenantAllowanceProvided - enum should handle
        // skip NonStandardCategory - not required, string


        return record
      })
    )

    namespacedEvents.use(exportWorkbookPlugin())
  })
}