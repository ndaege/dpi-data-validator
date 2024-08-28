export const blueprint = {
  "name": "Store&Lease Workbook",
  "sheets": [
    {
      "name": "in",
      "slug": "in",
      "fields": [
        {
          "key": "SCCompanyID",
          "label": "SCCompanyID",
          "type": "number",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "StoreName",
          "label": "StoreName",
          "type": "string",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "StoreNumber",
          "label": "StoreNumber",
          "type": "string",
          "constraints": [
            {
              "type": "required",
              "type": "unique"
            }
          ]
        },
        {
          "key": "LeaseNumber",
          "label": "LeaseNumber",
          "type": "string",
          "constraints": [
            {
              "type": "required",
              "type": "unique"
            }
          ]
        },
        {
          "key": "SCPropertyID",
          "label": "SCPropertyID",
          "type": "number",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "PropertyName",
          "label": "PropertyName",
          "type": "string",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "ParentRetailerName",
          "label": "ParentRetailerName",
          "type": "string",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "ContactName",
          "label": "ContactName",
          "type": "string"
        },
        {
          "key": "ContactTitle",
          "label": "ContactTitle",
          "type": "string"
        },
        {
          "key": "Active",
          "label": "Active",
          "description": "Data will be submitted as either 1 or 0",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": 1,
                "label": "1 - Active"
              },
              {
                "value": 0,
                "label": "0 - InActive"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "IcscMinorRetailCode",
          "label": "IcscMinorRetailCode",
          "type": "number"
        },
        {
          "key": "SpecialtyLeasingMinorCode",
          "label": "SpecialtyLeasingMinorCode",
          "type": "number"
        },
        {
          "key": "Permanence",
          "label": "Permanence",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": "Permanent",
                "label": "Permanent"
              },
              {
                "value": "Temporary",
                "label": "Temporary"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "SquareFeet",
          "label": "SquareFeet",
          "type": "number",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "SpaceType",
          "label": "SpaceType",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": "Anchor",
                "label": "Anchor - Permanent only"
              },
              {
                "value": "Food Court",
                "label": "Food Court - Permanent only"
              },
              {
                "value": "In-line",
                "label": "In-line - Permanent only"
              },
              {
                "value": "Kiosk",
                "label": "Kiosk - Permanent and Temporary"
              },
              {
                "value": "Outparcel",
                "label": "Outparcel - Permanent only"
              },
              {
                "value": "RMU / Cart",
                "label": "RMU / Cart - Temporary only"
              },
              {
                "value": "Temp In-line",
                "label": "Temp In-line - Temporary only"
              },
              {
                "value": "Vending",
                "label": "Vending - Temporary only"
              },
              {
                "value": "Other Space",
                "label": "Other Space - Temporary only"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ],
          
        },
        {
          "key": "SpaceNumber",
          "label": "SpaceNumber",
          "type": "string",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "Floor",
          "label": "Floor",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": "1st",
                "label": "1st"
              },
              {
                "value": "2nd",
                "label": "2nd"
              },
              {
                "value": "3rd",
                "label": "3rd"
              },
              {
                "value": "4th",
                "label": "4th"
              },
              {
                "value": "5th",
                "label": "5th"
              },
              {
                "value": "6th",
                "label": "6th"
              },
              {
                "value": "7th",
                "label": "7th"
              },
              {
                "value": "8th",
                "label": "8th"
              },
              {
                "value": "9th",
                "label": "9th"
              },
              {
                "value": "10th",
                "label": "10th"
              }
            ]
          }
        },
        {
          "key": "NonSalesReporting",
          "label": "NonSalesReporting",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": 1,
                "label": "1 - They do not report sales"
              },
              {
                "value": 0,
                "label": "0 - They report sales"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "ReportingFrequency",
          "label": "ReportingFrequency",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": "Monthly",
                "label": "Monthly"
              },
              {
                "value": "Quarterly",
                "label": "Quarterly"
              },
              {
                "value": "Semi-Annually",
                "label": "Semi-Annually"
              },
              {
                "value": "Annually",
                "label": "Annually"
              }
            ]
          },
          // Required but is dependenent on whether or not tenants report sales
        },
        {
          "key": "InitialSalesDueDay",
          "label": "InitialSalesDueDay",
          "type": "number",
          // Required but is dependent on whether or not tenants report sales
        },
        {
          "key": "AnnualCertifiedSalesDueDay",
          "label": "AnnualCertifiedSalesDueDay",
          "type": "number"
        },
        {
          "key": "LeaseEffectiveDate",
          "label": "LeaseEffectiveDate",
          "type": "date",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "LeaseExpirationDate",
          "label": "LeaseExpirationDate",
          "type": "date",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "LeaseYearEndDate",
          "label": "LeaseYearEndDate",
          "type": "date",
          // required but is dependent on Permanence
        },
        {
          "key": "OpenDate",
          "label": "OpenDate",
          "type": "date",
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "CloseDate",
          "label": "CloseDate",
          "type": "date"
        },
        {
          "key": "AnnualMinimumRent",
          "label": "AnnualMinimumRent",
          "type": "number"
        },
        {
          "key": "Breakpoint",
          "label": "Breakpoint",
          "type": "number"
        },
        {
          "key": "PercentageRentRate",
          "label": "PercentageRentRate",
          "type": "number"
        },
        {
          "key": "CAMExpenseRecovery",
          "label": "CAMExpenseRecovery",
          "type": "number"
        },
        {
          "key": "StoreRemodeled",
          "label": "StoreRemodeled",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": 1,
                "label": "1 - Yes"
              },
              {
                "value": 0,
                "label": "0 - No"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "StoreRemodeledDate",
          "label": "StoreRemodeledDate",
          "type": "date"
        },
        {
          "key": "TenantAllowanceProvided",
          "label": "TenantAllowanceProvided",
          "type": "enum",
          "config": {
            "options": [
              {
                "value": 1,
                "label": "1 - Yes"
              },
              {
                "value": 0,
                "label": "0 - No"
              }
            ]
          },
          "constraints": [
            {
              "type": "required"
            }
          ]
        },
        {
          "key": "TenantAllowanceAmount",
          "label": "TenantAllowanceAmount",
          "type": "number"
        },
        {
          "key": "NonStandardCategory",
          "label": "NonStandardCategory",
          "type": "string"
        }
      ]
    }
  ],
  "actions": [
    {
      "operation": "downloadWorkbook",
      "mode": "foreground",
      "label": "Submit",
      "primary": true
    }
  ]
}