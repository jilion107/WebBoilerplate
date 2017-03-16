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
            'onUpdateCategoryName',
            'deleteCategorySuccess',
            'deleteCategoryFail'
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

    updateCategory(category, dataSource, isCancel) {
        if(isCancel) {
            this.updateCategorySuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.categoryInstance.updateCategory(category).then((response) => {
                this.updateCategorySuccess(response);
            }, (response) => {
                this.updateCategoryFail(response);
            });
        }
    }

    addCategory(category) {
        this.categoryInstance.addCategory(category).then((response) => {
            if(response.result === "fail") {
                this.addCategoryFail(response.message);
            } else {
                response = _.assign(response, {
                    dataSource: dataSource,
                    isCancel: isCancel
                });
                this.addCategorySuccess(response);
            }
        }, (response) => {
            this.addCategoryFail(response);
        });
    }

    deleteCategory(index, categoryId) {
        this.categoryInstance.deleteCategory(categoryId).then((response) => {
            if(response.result === "fail") {
                this.deleteCategoryFail(response.message);
            } else {
                response = { index: index };
                this.deleteCategorySuccess(response);
            }
        }, (response) => {
            this.deleteCategoryFail(response);
        });
    }
}

export default alt.createActions(CategoryActions);