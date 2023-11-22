/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "3o63ltv3h5etksb",
      "created": "2023-11-22 17:10:56.895Z",
      "updated": "2023-11-22 18:37:51.256Z",
      "name": "Student",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "gmoekg7h",
          "name": "first_name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "iahrrgrl",
          "name": "last_name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "407hnulp",
          "name": "middle_initial",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 1,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "qgzgaltk",
          "name": "age",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "noDecimal": true
          }
        },
        {
          "system": false,
          "id": "2tqgamxm",
          "name": "gender",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "M",
              "F"
            ]
          }
        },
        {
          "system": false,
          "id": "wpwpiuwk",
          "name": "year_level",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "1",
              "2",
              "3",
              "4",
              "5"
            ]
          }
        },
        {
          "system": false,
          "id": "ojc1kpyb",
          "name": "nationality",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 25,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "bko3igfr",
          "name": "department",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "CS",
              "DS",
              "IT",
              "TCM"
            ]
          }
        },
        {
          "system": false,
          "id": "l89wdxmb",
          "name": "college",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "CITC"
            ]
          }
        },
        {
          "system": false,
          "id": "vm15hx7i",
          "name": "email",
          "type": "email",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": [],
            "onlyDomains": []
          }
        },
        {
          "system": false,
          "id": "xztltfuz",
          "name": "contact_no",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": 10,
            "max": 10,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jued7z2p",
          "name": "studentschedule_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "r1lngnbsx36goo2",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_wJODTcn` ON `Student` (\n  `first_name`,\n  `last_name`\n)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "n21gomr1b3f5a00",
      "created": "2023-11-22 17:33:40.926Z",
      "updated": "2023-11-22 18:38:03.735Z",
      "name": "Subject",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "uqrlahwx",
          "name": "course_code",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 25,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "qaty93bk",
          "name": "description",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "rm4jnmrq",
          "name": "credit_units",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "noDecimal": true
          }
        },
        {
          "system": false,
          "id": "lglzkoap",
          "name": "lecture_units",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "noDecimal": true
          }
        },
        {
          "system": false,
          "id": "5rjaknze",
          "name": "laboratory_units",
          "type": "number",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "noDecimal": true
          }
        },
        {
          "system": false,
          "id": "madjahxe",
          "name": "schedule_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "uq3c77feje7thhu",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_QnyDtWa` ON `Subject` (`course_code`)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "dzor3ve42gzla70",
      "created": "2023-11-22 17:34:26.367Z",
      "updated": "2023-11-22 18:37:10.836Z",
      "name": "Faculty",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "qbfaenho",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "9s3p6opm",
          "name": "schedule_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "uq3c77feje7thhu",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_hfW1tgv` ON `Faculty` (`name`)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "p48aayug763hyu8",
      "created": "2023-11-22 17:36:52.968Z",
      "updated": "2023-11-22 18:37:16.565Z",
      "name": "Room",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "4dykqg9v",
          "name": "description",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 50,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "qqlslqk0",
          "name": "schedule_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "uq3c77feje7thhu",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_JklLTp3` ON `Room` (`description`)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "uq3c77feje7thhu",
      "created": "2023-11-22 17:46:37.235Z",
      "updated": "2023-11-22 18:37:41.602Z",
      "name": "Schedule",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "nfkx3kqd",
          "name": "subject_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "n21gomr1b3f5a00",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "kb5og8m7",
          "name": "faculty_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "dzor3ve42gzla70",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "zsrdynum",
          "name": "room_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "p48aayug763hyu8",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "i5q5pdsb",
          "name": "section",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": 25,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "n0sradue",
          "name": "day",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "M",
              "T",
              "W",
              "Th",
              "F",
              "S"
            ]
          }
        },
        {
          "system": false,
          "id": "vstpvrur",
          "name": "start_time",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": 5,
            "max": 5,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ge4f6vtx",
          "name": "end_time",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": 5,
            "max": 5,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "k1nzty1z",
          "name": "semester",
          "type": "select",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "1",
              "2"
            ]
          }
        },
        {
          "system": false,
          "id": "ki2l5i3x",
          "name": "year",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": 4,
            "max": 4,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "xkkandlu",
          "name": "studentschedule_id",
          "type": "relation",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "r1lngnbsx36goo2",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_zJMDep8` ON `Schedule` (\n  `section`,\n  `day`,\n  `semester`,\n  `year`\n)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "r1lngnbsx36goo2",
      "created": "2023-11-22 17:49:21.261Z",
      "updated": "2023-11-22 17:49:21.261Z",
      "name": "StudentSchedule",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "fm3eumok",
          "name": "student_id",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "3o63ltv3h5etksb",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "zlbztace",
          "name": "schedule_id",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "uq3c77feje7thhu",
            "cascadeDelete": true,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        }
      ],
      "indexes": [
        "CREATE UNIQUE INDEX `idx_WVBI0VV` ON `StudentSchedule` (\n  `student_id`,\n  `schedule_id`\n)"
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
