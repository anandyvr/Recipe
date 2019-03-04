import React, { Component } from 'react';
import Button from '../elements/button'
import RecipeList from '../constants/recipeList'


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeSelectedList: [], //This dictionary holds if the recipe is selected,
            ingredients: [], //List of Unique ingredients selected
            ingredientsFullList: [] //Complete list of ingredients selected - including duplicates
        }
    }

    componentWillMount() {
        var newList = [];
        RecipeList.forEach((recipe) => {
            newList[recipe.name] = false;
        })
        this.setState({
            recipeSelectedList: newList
        });
    }

    selectUnselectRecipe = (item) => {
        const selectedItem = item.currentTarget.value;
        const newList = { ...this.state.recipeSelectedList };
        let unOrderedIngredientList = this.state.ingredientsFullList.slice();
        if (this.state.recipeSelectedList[selectedItem]) {
            newList[selectedItem] = false;
            RecipeList.forEach(function (recipe) {
                if (recipe.name === selectedItem) {
                    for (let i = 0; i < recipe.ingredients.length; i++) {
                        unOrderedIngredientList.splice(unOrderedIngredientList.indexOf(recipe.ingredients[i]), 1);
                    }
                }
            });
        }
        else {
            newList[selectedItem] = true;
            RecipeList.forEach(function (recipe) {
                if (recipe.name === selectedItem) {
                    unOrderedIngredientList = unOrderedIngredientList.concat(recipe.ingredients);
                }
            }, this);

        }
        this.setState({
            ingredientsFullList: unOrderedIngredientList,
            ingredients: [...new Set(unOrderedIngredientList.sort())], //Select Distinct elements after sorting
            recipeSelectedList: newList
        });
    }

    render() {
        return (
            <div>
                <span className="header-text">Select / Unselect a Recipe</span>
                {RecipeList.map(function (recipe) {
                    return <Button clicked={this.selectUnselectRecipe} selected={this.state.recipeSelectedList[recipe.name]} text={recipe.name} value={recipe.name} key={recipe.name} />
                }, this)}
                {this.state.ingredients.length > 0 &&
                    <span className="ingredient-header">Ingredients</span>}
                {this.state.ingredients.map(function (ingredient) {
                    return <div className="ingredientItem" key={ingredient}>{ingredient}</div>
                })}
            </div>
        );
    }

}


export default Recipe;

