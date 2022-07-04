/**
  It kind of looks like a singly linked-list data structure, but this
  one is a 2D arrays generator/converter class
 */
export class To2DCollection{
 
 /**
 * @param arr input/given array
 * @returns a new array of collections
 *  where each collection contains the previous
 * element and an array of the next element from the 
 * original array
 * 
 * For example: an array like this: [1, 2, 3, 4, 5, 6,7]
 * will return [1,[2, [3,[4,[5,[6,[7,[...]]]]]]]]
 */
  to2D = (arr: any[]) => {
    var arr1:any[] = [];
  
    for (let i = 0; i < arr.length; i++) {
      
      if (i >= 0 && arr[i + 1]) { 
        var tmp:any[] = [arr[i]]
       
        if (arr[i+1] && !tmp.includes([arr[i+1]])){
          tmp.push([arr[i+1]])
        }
  
        //Pushing a new 2D at the 
        //tail of the array
        if(!arr1.includes(tmp)) {
          arr1.push(tmp)
          tmp = []
        }
      }
    }
    this.merger(arr1);

    return [arr1[0]]
  }
   
  /**
   * merging children into their parents starting from
   * from the bottom element and we will end up with
   * 2 items new array
   */
  public merger(arr: any[]): void {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
  
      for (let j = 0; j < arr.length; j++) {
        const elt = arr[j];
        if (i !== j && elt !== element){
         
          /** At this point, we have in our arr items with this
           * format  [parent, [child, [...]]]

          
            For any given array = [A, [B]] with its last element array[array.length-1] =[B],
            if any element = array[index] includes B, then element should
            be merged into [B] which will be returning a
            2D array in this format array = [A,[B, [C]]]


            Therefore, when array = [A,[B,[C]]], A as the first item at 0 wont't be considered 
            as an array object, same B for the sub-array [B, [C]], 
            so does C for the sub-array[C]
           */
          if (elt[elt.length-1].includes(element[0])){
            elt[elt.length-1].push(element[element.length-1])
          }
        }
      }
    }
  }
  
 /**
 * This function will return one dimensional array
 * from a multi-dimensional array
 * @param arr: given multi-dimensional array
 * For instance: [1,[2, [3,[4,[5,[6,[7,[...]]]]]]]]
 * should return [1,2,3,4,5, 6,7,...]
 */
  public fromCollections = (arr: any[]):any[] => {
    var newArray: any[] = [];
    var temp = arr[0];
    
    try {
      for (let i = 0; i < arr.length; i++) {
        var tmp:any[] = []
    
        //Only loop through an array at 1
        while (typeof arr[i] === 'object' && tmp){
          var elt = arr[1];
    
          //current 2D array
          if (elt[1] && typeof elt[1] === 'object') {
            tmp = elt[1];
          }
          //First extend the lenght of the array
          //by moving the first element at the end
          //of the array
          if (tmp && tmp.length > 0){
            arr = [...arr, tmp]
            tmp = []
          }
          
          //Check if it's a 2D and 
          //push it into the new array,
          //Then deleted when unneeded
          if (arr[1][0]){
            newArray.push(arr[1][0]);
          } 
          arr.splice(1, 1)
        }
      }
    } catch (error) {
      console.error(error)
    }
    return [temp, ...newArray]
  }
}
