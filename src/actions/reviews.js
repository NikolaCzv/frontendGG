export const addReview = (review, game, user) => {
    return function(dispatch){

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: review.content,
                game_id: game.id,
                user_id: user.id
            })
        }

        fetch('http://localhost:3000/api/v1/reviews', reqObj)
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                alert('Something went wrong, please try again')
            } else {
                console.log(data)
                alert('The review is added!')
            }
        })

    }
}