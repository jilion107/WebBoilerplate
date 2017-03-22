/**
 * Created by jilion.chen on 3/9/2017.
 */
import Transport from '../common/Transport';
import { RESTAPI_HOST, HEARDS }from '../common/Config';

class CompanyTransport extends Transport {
    constructor(props) {
        super(props);
    }

    getAllCompany() {
        return this.ajaxRequest({
            method: 'get',
            url: RESTAPI_HOST + '/api/companies',
            requestBody: {}
        });
    }

    updateCompany(company) {
        return this.ajaxRequest({
            method: 'put',
            url: RESTAPI_HOST + '/api/companies/' + company.id,
            requestBody: JSON.stringify(company),
            headers: HEARDS
        });
    }

    addCompany(company) {
        return this.ajaxRequest({
            method: 'post',
            url: RESTAPI_HOST + '/api/company',
            requestBody: JSON.stringify(company),
            headers: HEARDS
        });
    }

    deleteCompany(companyId) {
        return this.ajaxRequest({
            method: 'delete',
            url: RESTAPI_HOST + '/api/companies/' + companyId,
            requestBody: {},
            headers: HEARDS
        });
    }
}

export  default  CompanyTransport;