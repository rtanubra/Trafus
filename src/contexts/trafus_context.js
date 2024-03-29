import React from 'react'

const TrafusContext = React.createContext({
    loggedIn:false,
    trafus_teams : "",
    trafus_users :"",
    trafus_categories :"",
    trafus_expenses:"",
    addCategory:()=>{},
    addExpense:()=>{},
    editExpense:()=>{},
    editCategory:()=>{},
    deleteCategory:()=>{},
    deleteExpense:()=>{},
    team:"",
})

export default TrafusContext