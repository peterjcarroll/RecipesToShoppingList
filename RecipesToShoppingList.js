Recipes = new Meteor.Collection('recipes');
ShoppingList = new Meteor.Collection('shoppinglist');

if (Meteor.isClient) {
    /* Recipes template */
    Template.recipes.events = {};

    Template.recipes.events['click #createRecipeBtn'] = function(event) {
        $('#createRecipeDialog').show();
        $('#inputRecipeName').focus();
    };

    Template.recipes.recipes = function () {
        return Recipes.find({});
    };

    /* createRecipeDialog template */
    Template.createRecipeDialog.events = {};

    Template.createRecipeDialog.events['click #addAnotherIngredient'] = function(event) {
        var numIngredients = $('#numIngredients').val();
        numIngredients++;
        $('#numIngredients').val(numIngredients);
        $('#createRecipeIngredients').append(Template.addIngredient({index: numIngredients}));
        return false;
    };

    Template.createRecipeDialog.events['click #createRecipeSaveBtn'] = function(event) {
        var name = $('#inputRecipeName').val();
        var numServings = $('#inputNumServings').val();
        var numIngredients = $('#numIngredients').val();
        ingredients = [];
        for(var i=1; i<=numIngredients; i++){
            var qty = $('qty' + i).val();
            var measure= $('measure' + i).val();
            var ingredientName = $('ingredientName' + i).val();
            ingredients.push({qty: qty, measure: measure, name: ingredientName});
        }
        if(name != ''){
            Recipes.insert({name: name, numServings: numServings, ingredients: ingredients});
            //clear form
            $('#inputRecipeName').val('');
            $('#inputNumServings').val('1');
            $('#createRecipeIngredients').empty();
            $('#numIngredients').val('1');
            $('#createRecipeIngredients').append(Template.addIngredient({index: 1}));
        }
    };

    Template.createRecipeDialog.rendered = function() {
        var numIngredients = $('#numIngredients').val();
        for(var i=0; i<numIngredients; i++){
            $('#createRecipeIngredients').append(Template.addIngredient({index: i+1}));
        }
    };


}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
