import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"

class ListExpenses extends Component{
    static contextType = TrafusContext

    render(){
        const {categoryId, teamId} = this.props.match.params
        return (
            <div>
                Hello world
            </div>
        )
    }
}
export default ListExpenses