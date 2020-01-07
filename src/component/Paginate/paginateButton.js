import React from 'react' ;

export class PaginateButton extends React.Component {

    getNumber = (current , total ) => {
        if (total < 4) {
            return [...Array(total + 1).keys()].slice(1);
        } else if (current <= 4) {     
            return [1, 2, 3, 4, 5];
        } else  if (current > total - 4) {
            return [...Array(5).keys()].reverse()
                .map(v => total - v);
        } else {
            return [current -1, current,
                Number(current) + 1];
        } 
    }

    render(){
        
        const currentPage = Number(this.props.currentPage) ;
        const pageCount = Number(this.props.pageCount) ;

        return <div>
            <div className="text-center">
                {
                    currentPage > 4 &&  
                        <React.Fragment>
                            <button onClick={() => this.props.navTo(1)}
                                className="btn btn-sm btn-secondary">
                                    1
                            </button>
                            <span>...</span>
                        </React.Fragment>    
                }
                {
                    this.getNumber(currentPage , pageCount)
                            .map(page => 
                                <button key={page} className={`btn btn-sm ${page === currentPage ? 
                                                    "btn-primary" : "btn-secondary"}`}
                                    onClick={() => this.props.navTo(page)} >
                                    {page}
                                </button>
                            )
                }
                {
                    (currentPage > 4 && currentPage <= pageCount - 4) &&
                        <React.Fragment>
                            <button className="btn btn-sm btn-secondary"
                                onClick={() => this.props.navTo(pageCount)}>
                                {pageCount}
                            </button>
                        </React.Fragment>
                }
            </div>
        </div>
    }


}