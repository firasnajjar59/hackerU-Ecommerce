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
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|ne|regex)\b/g, match => `$${match}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    if(queryObj.name){
      this.query = this.query.find({name:new RegExp('^' +queryObj.name, 'i')});
    }
    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortStr = this.requestQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortStr);
    } else {
      this.query = this.query.sort('-createdAt');
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
    if(+this.requestQuery.page&&this.requestQuery.limit){
      const page = +this.requestQuery.page;
      const limit = +this.requestQuery.limit;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      this.skip=skip
      this.limit=limit
    }
    return this;
  }
}
module.exports =ApiFeatures