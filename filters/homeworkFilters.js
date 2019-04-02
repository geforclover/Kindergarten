angular.module("homeworkFilters", [])
    .filter("byName", function () {
        return function (data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [],
                    keys = {},
                    i = null

                for (i = 0; i < data.length; i += 1) {
                    var val = data[i][propertyName]

                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        results.push(val)
                    }
                }
                return results;
            } else {
                return data;
            }
        }
    })
    .filter("range", function ($filter) {
        return function (data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size

                if (data.length < start_index) {
                    return [];
                } else {
                    return $filter("limitTo")(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        }
    })
    .filter("pageCount", function () {
        return function (data, size) {
            if (angular.isArray(data)) {
                var result = [],
                    i = null

                for (i = 0; i < Math.ceil(data.length / size); i += 1) {
                    result.push(i)
                }
                return result;
            } else {
                return data;
            }
        }
    })
    .filter("to_trusted", function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    })