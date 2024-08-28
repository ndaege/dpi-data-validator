export const blueprint = {
  "name": "Monthly Sales Blueprint",
  "sheets": [
    {
      "name": "ms",
      "slug": "ms",
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
            }
            
          ]
        },
        {
          "key": "EndDate",
          "label": "EndDate",
          "type": "date"
        },
        {
          "key": "TotalNetSales",
          "label": "TotalNetSales",
          "type": "number"
        },
        {
          "key": "IsAnnuallyCertified",
          "label": "IsAnnuallyCertified",
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