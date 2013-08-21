Recipes = new Meteor.Collection('recipes');
ShoppingList = new Meteor.Collection('shoppinglist');

if (Meteor.isClient) {
    /* Recipes template */
    Template.recipes.events = {};

    Template.recipes.events['click #createRecipeBtn'] = function(event) {
        $('#createRecipe').show();
        $('#inputRecipeName').focus();
    };

    Template.recipes.recipes = function () {
        return Recipes.find({});
    };

    /* createRecipeDialog template */
    Template.createRecipe.events = {};

    Template.createRecipe.events['click #addAnotherIngredient'] = function(event) {
        var numIngredients = $('#numIngredients').val();
        numIngredients++;
        $('#numIngredients').val(numIngredients);
        $('#createRecipeIngredients').append(Template.addIngredient({index: numIngredients}));
        return false;
    };

    Template.createRecipe.events['click #createRecipeSaveBtn'] = function(event) {
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

    Template.createRecipe.rendered = function() {
        var numIngredients = $('#numIngredients').val();
        for(var i=0; i<numIngredients; i++){
            $('#createRecipeIngredients').append(Template.addIngredient({index: i+1}));
        }
    };

    /* navbar template */
    Template.navbar.changeScreen = function(screenName) {
        $('ul.nav li').each(function(idx, element){
            if($(element).attr('class') === 'active') {
                $(element).attr('class','');
                var id = $(element).attr('id');
                id = id.substring(0, id.length -3); // remove 'Nav' from the end of the name
                $('#' + id).hide();
            }
        });

        $('#' + screenName + 'Nav').attr('class', 'active');
        $('#' + screenName).show();
    };

    Template.navbar.events = {};

    Template.navbar.events['click #createRecipeNavLink'] = function(event) {
        Template.navbar.changeScreen('createRecipe');
    };

    Template.navbar.events['click #shoppingListNavLink'] = function(event) {
        Template.navbar.changeScreen('shoppingList');
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
