class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //data
    this.queryString = queryString; //obj of querey params
  }

  filter() {
    try {
      // 1. Create a shallow copy of query params
      const queryObj = { ...this.queryString };

      // 2. Remove reserved fields
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((field) => delete queryObj[field]);

      // 3. Advanced filtering with MongoDB operators
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      // 4. Parse the query string back to an object
      const parsedQuery = JSON.parse(queryStr);

      // 5. Apply the filter to the query
      this.query = this.query.find(parsedQuery);

      return this; // Enable method chaining
    } catch (error) {
      console.error("Error in filter method:", error);
      throw new Error(`Failed to apply filters: ${error.message}`);
    }
  }

  sort() {
    // 3. Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // default deterministic sort by insertion order (_id)
      this.query = this.query.sort({ _id: 1 });
    }
    return this;
  }

  limitFields() {
    // 4. Field limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // 5. Pagination
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    const limit = Math.max(1, parseInt(this.queryString.limit, 10) || 10);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
