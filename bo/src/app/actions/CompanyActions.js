/**
 * Created by jilion.chen on 3/9/2017.
 */
import alt from '../common/alt';
import CompanyTransport from '../transport/CompanyTransport';
import _ from 'underscore';

class CompanyActions {
    constructor() {
        this.generateActions(
            'getAllCompanySuccess',
            'getAllCompanyFail',
            'updateCompanySuccess',
            'updateCompanyFail',
            'updateCompanyName',
            'addCompanySuccess',
            'addCompanyFail',
            'onUpdateCompanyName',
            'deleteCompanySuccess',
            'deleteCompanyFail'
        );
        this.companyInstance = new CompanyTransport();
    }

    getAllCompany() {
        //let companyInstance = new CompanyTransport();
        this.companyInstance.getAllCompany().then((response) => {
            _.assign(response, history)
            this.getAllCompanySuccess(response);
        }, (response) => {
            this.getAllCompanyFail(response);
        });
    }

    updateCompany(company) {
        this.companyInstance.updateCompany(company).then((response) => {
            this.updateCompanySuccess(response);
        }, (response) => {
            this.updateCompanyFail(response);
        });
    }

    addCompany(company) {
        this.companyInstance.addCompany(company).then((response) => {
            this.addCompanySuccess(response);
        }, (response) => {
            this.addCompanyFail(response);
        });
    }

    deleteCompany(companyId) {
        this.companyInstance.deleteCompany(companyId).then((response) => {
            this.deleteCompanySuccess(response);
        }, (response) => {
            this.deleteCompanyFail(response);
        });
    }
}

export default alt.createActions(CompanyActions);