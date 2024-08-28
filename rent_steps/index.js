const namespace = ['space:dpi-rent-steps-validator']
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

    namespacedEvents.use(autocast("rs", ["SCCompanyID", "SCPropertyID", "MonthlyRent"]))

    namespacedEvents.use(
      recordHook('rs', (record) => {
        const leaseEffectiveDate = record.get("LeaseEffectiveDate")
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        if (!dateRegex.test(leaseEffectiveDate)) {
          record.addError("LeaseEffectiveDate", "Invalid date format: YYYY-MM-DD")
        }

        const startDate = record.get("StartDate")
        const startDateRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-([0-2][0-9]|3[0-1])$/
        if (!startDateRegex.test(startDate)) {
          record.addError("StartDate", "Invalid date format: MMM-YY")
        }

        const monthlyRent = record.get("MonthlyRent")
        if (monthlyRent < 0) {
          record.addError("MonthlyRent", "Must be 0 or greater")
        }

        return record
      })
    )

    namespacedEvents.use(exportWorkbookPlugin())
  })
}