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
            "name":"transportation",
            "id":2,
            "team_id":1,
            "budget":500
        },
        {
            "name":"groceries",
            "id":3,
            "team_id":1,
            "budget":500
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
        }
    ]
})

export default TrafusContext