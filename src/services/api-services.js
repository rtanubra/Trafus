const ApiService = {
    getAllCategories(final_url){
        fetch(final_url).then(response=>{
            if (response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ApiService