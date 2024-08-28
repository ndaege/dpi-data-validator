export const blueprint = {
  "name": "Rent Steps Blueprint",
  "sheets": [
    {
      "name": "rs",
      "slug": "rs",
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
              "type": "required"
            },
            {
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
              "type": "required"
            },
            {
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
          "key": "StartDate",
          "label": "StartDate",
          "type": "date",
          "constraints": [
            {
              "type": "required"
            },
            {
              "type": "unique"
            }
          ]
        },
        {
          "key": "EndDate",
          "label": "EndDate",
          "type": "date"
        },
        {
          "key": "MonthlyRent",
          "label": "MonthlyRent",
          "type": "number", 
          "constraints": [
            {
              "type": "required"
            }
          ]
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