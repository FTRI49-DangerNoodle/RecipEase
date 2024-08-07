# Recipe API

## Overview

WIP

## Endpoints

### POST /insert
- **Description**: Inserts a large set of recipes into the database.
- **Controller**: `insertRecipes`
- **Usage**: Uncomment `insertMany` in the `insertRecipes` controller before use.

### POST /search
- **Description**: Searches for a recipe by name.  **CAN BE CHANGED TO GET IN THE FUTURE**
- **Controller**: `getRecipeByName`
- **Request Body**: `{ "name": "recipeName" }`

### GET /autocompleteId
- **Description**: Provides autocomplete suggestions for recipe IDs based on a query. **NOT TESTED ON CLIENT SIDE**
- **Controller**: `autoCompleteByQueryId`
- **Query Parameters**: `query` (e.g., `/autocompleteId?query=ch`)

### POST /autocompleteName
- **Description**: Provides autocomplete suggestions for recipe names. **NOT TESTED ON CLIENT SIDE**
- **Controller**: `autoCompleteByName`
- **Request Body**: `{ "name": "partialRecipeName" }`

### GET /:id
- **Description**: Retrieves a recipe by its object ID.
- **Controller**: `getRecipeById`
- **Route Parameter**: `id` (e.g., `/123456`)

## Model

### Recipe
- **File**: `models/recipesData.js`
- **Description**: Represents the recipe data schema in MongoDB.

## Utilities/Algorithims

### transformDataForDB
- **File**: `DB_insert_algorithm/transformDataForDB.js`
- **Function**: Transforms raw recipe data into a format suitable for database insertion.

## Notes

- Ensure to uncomment the `insertMany` line in the `insertRecipes` controller to enable data insertion.
- The `/autocompleteId` route should be placed before the `/:id` route to avoid conflicts during autocomplete requests.
