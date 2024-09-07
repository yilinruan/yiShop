class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr || {}; // Ensure queryStr is always an object
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            };
            this.query = this.query.find(keyword);
            this.queryStr.page = 1;
        }
    
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing fields that are not used for filtering
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryCopy[field]);

        // Convert filters to MongoDB format
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        if (queryStr !== '{}') {
            this.query = this.query.find(JSON.parse(queryStr));
        }
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
