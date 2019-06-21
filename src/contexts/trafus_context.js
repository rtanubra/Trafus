import React, { Component } from 'react'

const TrafusContext = React.createContext({
    trafus_teams : [{
        "name":'test_1_team',
        "id":1
    }],
    trafus_users :[
        {"full_name":"Test One The Human",
        "user_name":"test_1",
        "id":1,
        "team_id":1,
        "password":"password"}
    ],
    trafus_categories :[
        {
            "name":"Food and Wine",
            "id":1,
            "team_id":1,
            "budget":1500,
        },
        {
            "name":"Transportation",
            "id":2,
            "team_id":1,
            "budget":500
        },
        {
            "name":"Groceries",
            "id":3,
            "team_id":1,
            "budget":500
        },
        {
            "name":"Phone",
            "id":4,
            "team_id":1,
            "budget":120
        }

    ],
    trafus_expenses:[
        {
            "name":"Italian",
            "expense":50,
            "id":1,
            "category_id":1
        },
        {
            "name":"Japanese",
            "expense":150,
            "id":2,
            "category_id":1
        },
        {
            "name":"Longos",
            "expense":50,
            "id":3,
            "category_id":3
        },
        {
            "name":"Go-1",
            "expense":300,
            "id":4,
            "category_id":2
        },
        {
            "name":"Go-2",
            "expense":100,
            "id":5,
            "category_id":2
        },
        {
            "name":"Pay that telephone bill",
            "expense":110,
            "id":6,
            "category_id":4
        },
        {
            "name":"Wine tasting",
            "expense":410,
            "id":7,
            "category_id":1
        }
    ]
})

export default TrafusContext