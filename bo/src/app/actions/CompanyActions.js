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
        this.companyInstance.getAllCompany().then((response) => {
            _.assign(response, history)
            this.getAllCompanySuccess(response);
        }, (response) => {
            this.getAllCompanyFail(response);
        });
    }

    updateCompany(company, dataSource, isCancel) {
        if(isCancel) {
            this.updateCompanySuccess({
                dataSource: dataSource,
                isCancel: isCancel
            });
        } else {
            this.companyInstance.updateCompany(company).then((response) => {
                if(response.result === "fail") {
                    this.updateCompanyFail(response.message);
                } else {
                    response = _.assign(response, {
                        dataSource: dataSource,
                        isCancel: isCancel
                    });
                    this.updateCompanySuccess(response);
                }
            }, (response) => {
                this.updateCompanyFail(response);
            });
        }
    }

    addCompany(company) {
        this.companyInstance.addCompany(company).then((response) => {
            if(response.result === "fail") {
                this.addCompanyFail(response.message);
            } else {
                this.addCompanySuccess(response.company);
            }
        }, (response) => {
            this.addCompanyFail(response);
        });
    }

    deleteCompany(index, companyId) {
        this.companyInstance.deleteCompany(companyId).then((response) => {
            if(response.result === "fail") {
                this.deleteCompanyFail(response.message);
            } else {
                response = { index: index };
                this.deleteCompanySuccess(response);
            }
        }, (response) => {
            this.deleteCompanyFail(response);
        });
    }
}

export default alt.createActions(CompanyActions);