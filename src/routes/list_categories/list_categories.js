import React, {Component} from 'react'
import './list_categories.css'
import TrafusContext from "../../contexts/trafus_context"

class ListCategories extends Component {
    componentDidMount(){
        const {userId, teamId} = this.props.match.params
    }

    state = {
        categories: TrafusContext.trafus_categories,
        expenses:TrafusContext.trafus_expenses
    }
    render(){
        return (
            <>
            </>
            )
    }
}

export default ListCategories