/**
 * Created by Jilion on 2017/3/10.
 */
import alt from '../common/alt';
import CategoryTransport from '../transport/CategoryTransport';
import _ from 'underscore';

class CategoryActions {
    constructor() {
        this.generateActions(
            'getAllCategoriesSuccess',
            'getAllCategoriesFail',
            'updateCategorySuccess',
            'updateCategoryFail',
            'updateCategoryName',
            'addCategorySuccess',
            'addCategoryFail',
            'onUpdateCategoryName'
        );
        this.categoryInstance = new CategoryTransport();
    }

    getAllCategories() {
        this.categoryInstance.getAllCategories().then((response) => {
            _.assign(response, history)
            this.getAllCategoriesSuccess(response);
        }, (response) => {
            this.getAllCategoriesFail(response);
        });
    }

    updateCategory(category) {
        this.categoryInstance.updateCategory(category).then((response) => {
            this.updateCategorySuccess(response);
        }, (response) => {
            this.updateCategoryFail(response);
        });
    }

    addCategory(category) {
        this.categoryInstance.addCategory(category).then((response) => {
            this.addCategorySuccess(response);
        }, (response) => {
            this.addCategoryFail(response);
        });
    }
}

export default alt.createActions(CategoryActions);