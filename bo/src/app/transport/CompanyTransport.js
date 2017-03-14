/**
 * Created by jilion.chen on 3/9/2017.
 */
import Transport from '../common/Transport';

class CompanyTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllCompany() {
        return this.ajaxRequest({
            method: 'get',
            url: 'http://localhost:8080/api/companies',
            requestBody: {}
        });
    }

    updateCompany(company) {
        return this.ajaxRequest({
            method: 'put',
            url: 'http://localhost:8080/api/companies/' + company.id,
            requestBody: JSON.stringify(company),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    addCompany(company) {
        return this.ajaxRequest({
            method: 'post',
            url: 'http://localhost:8080/api/company',
            requestBody: JSON.stringify(company),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    deleteCompany(companyId) {
        return this.ajaxRequest({
            method: 'delete',
            url: 'http://localhost:8080/api/companies/' + companyId,
            requestBody: {},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

export  default  CompanyTransport;