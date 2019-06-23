import React, { Component } from 'react'

const TrafusContext = React.createContext({
    trafus_teams : "",
    trafus_users :"",
    trafus_categories :"",
    trafus_expenses:"",
    addCategory:()=>{},
    //addExpense:()=>{},
    //deleteCategory:()=>{},
    //deleteExpense:()=>{},
})

export default TrafusContext