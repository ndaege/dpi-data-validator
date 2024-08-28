const namespace = ['space:dpi-monthly-sales-validator']
import api from '@flatfile/api'
import { recordHook } from '@flatfile/plugin-record-hook'
import { exportWorkbookPlugin } from '@flatfile/plugin-export-workbook'
import { blueprint } from './blueprint'
import { autocast } from '@flatfile/plugin-autocast'

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

    namespacedEvents.use(autocast("ms", ["SCCompanyID", "SCPropertyID", "TotalNetSales", "IsAnnuallyCertified"]))

    namespacedEvents.use(
      recordHook('ms', (record) => {
        // skip SCCompanyID - autocast should handle
        // skip StoreName - required string
        // skip StoreNumber - autocast should handle
        // skip LeaseNumber - autocast should handle
        // skip SCPropertyID - autocast should handle
        // skip PropertyName - required string
      
        const leaseEffectiveDate = record.get("LeaseEffectiveDate")
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        if (!dateRegex.test(leaseEffectiveDate)) {
          record.addError("LeaseEffectiveDate","Invalid date format: YYYY-MM-DD")
        }
        // const startDateRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-([0-2][0-9]|3[0-1])$/

        // StartDate was changed in the DB to accept YYYY-MM-DD format
        const startDate = record.get("StartDate")
        if (!dateRegex.test(startDate)) {
          record.addError("StartDate", "Invalid date format: YYYY-MM-DD")
        }

        const endDate = record.get("EndDate")
        if (endDate === "" || endDate === null) {
          // do nothing
        } else if (!dateRegex.test(endDate)) {
          record.addError("EndDate", "Invalid date format: YYYY-MM-DD")
        }

        const totalNetSales = record.get("TotalNetSales") 
        if (totalNetSales < 0) {
          record.addError("TotalNetSales", "If TotalNetSales are negative, must be 0")
        }
        
        return record
      })
    )

    namespacedEvents.use(exportWorkbookPlugin())
  })
}