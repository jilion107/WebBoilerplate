/**
 * Created by Jilion on 2017/3/10.
 */
import Transport from '../common/Transport';

class CategoryTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllCategories() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/categories',
            requestBody: {}
        });
    }

    updateCategory(category) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/categories/' + category.id,
            requestBody: JSON.stringify(category),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addCategory(category) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/category',
            requestBody: JSON.stringify(category),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export default CategoryTransport;