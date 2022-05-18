/**
 * @description Common prototyping methods
 */

/* eslint-disable */
/**
 * Split Array
 * @param size Quantity per
 * example:
 [1,2,3,4,5,6,7,8,9,10].partition(2) =>  [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ] ]
 [1,2,3,4,5,6,7,8,9,10].partition(3) =>  [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]
 * @returns {*}
 */
// @ts-ignore
if (Array.prototype.partition === undefined) {
  // @ts-ignore
  Array.prototype.partition = function (size: number) {
    return this.reduce((partition, element) => {
      let currentChunk = partition[partition.length === 0 ? 0 : partition.length - 1]
      if (!currentChunk) {
        partition[partition.length === 0 ? 0 : partition.length - 1] = []
        currentChunk = partition[partition.length === 0 ? 0 : partition.length - 1]
      }
      if (currentChunk.length < size) {
        currentChunk.push(element)
      } else {
        partition[partition.length] = [element]
      }
      return partition
    }, [])
  }
}
// @ts-ignore-block

/**
 * How many part are distributed
 * @param number
 * example:
 [1,2,3,4,5,6,7,8,9,10].distribute(2) =>  [ [ 1, 3, 5, 7, 9 ], [ 2, 4, 6, 8, 10 ] ]
 [1,2,3,4,5,6,7,8,9,10].distribute(3) =>  [ [ 1, 4, 7, 10 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
 * @returns {*}
 */
// @ts-ignore
if (Array.prototype.distribute === undefined) {
  // @ts-ignore
  Array.prototype.distribute = function (number: number) {
    return this.reduce((partition, element, index) => {
      let currentChunk = partition[index % number]
      if (!currentChunk) {
        currentChunk = []
        partition[index % number] = currentChunk
      }
      currentChunk.push(element)
      return partition
    }, [])
  }
}

/**
 * distinct
 * @param prototype According to the prototype, it can only be a single prototype, or 0 prototype
 * example:
 [1,3,4,5,5,5,5,1,2,3,4].distinct() =>  [ 1, 3, 4, 5, 2 ]
 [{"name": "ltc.btc"},{"name": "btc.usdt" },{"name": "eth.btc" },{"name": "btc.usdt"},{"name": "etc.btc"},{"name": "btc.usdt" }].distinct('name') => [ { name: 'ltc.btc' },{ name: 'btc.usdt' },{ name: 'eth.btc' },{ name: 'etc.btc' } ]
 * @returns {*}
 */
// @ts-ignore
if (Array.prototype.distinct === undefined) {
  // @ts-ignore
  Array.prototype.distinct = function (prototype: any) {
    return prototype
      ? this.filter(
          (element, index) => index === this.findIndex((elementTemp) => elementTemp[prototype] === element[prototype]),
        )
      : this.filter((element, index) => this.indexOf(element) === index)
  }
}
/* eslint-enable */
