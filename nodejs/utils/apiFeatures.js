/** @format */

class ApiFeatures {
  constructor(query, requestQuery) {
    this.query = query;
    this.requestQuery = requestQuery;
  }

  filter() {
    //* filter
    const queryObj = { ...this.requestQuery };
    const exludedKeys = ['page', 'sort', 'limit', 'fields'];
    exludedKeys.forEach(el => delete queryObj[el]);
    //* advanced filter
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|ne)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    console.log(this.query);
    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortStr = this.requestQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortStr);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  fields() {
    if (this.requestQuery.fields) {
      const fieldsStr = this.requestQuery.fields.split(',').join(' ');
      this.query = this.query.select(fieldsStr);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.requestQuery.page || 1;
    const limit = +this.requestQuery.limit || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    this.skip=skip
    this.limit=limit
    return this;
  }
}
module.exports =ApiFeatures