/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class CategoryTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllCategories() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/categories',
            requestBody: {}
        });
    }

    updateCategory(category) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/categories/' + category.id,
            requestBody: JSON.stringify(category),
            headers: HEARDS
        });
    }

    addCategory(category) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/category',
            requestBody: JSON.stringify(category),
            headers: HEARDS
        });
    }

    deleteCategory(categoryId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/categories/' + categoryId,
            requestBody: {},
            headers: HEARDS
        });
    }
}

export default CategoryTransport;