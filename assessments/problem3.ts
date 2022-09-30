type DataPiece = {
  user: string;
  post: string;
  moreData?: DataHeader[]
}

type DataColumn = {
  data: DataPiece[]
}

type DataRow = {
  cols: DataColumn[]
}

type DataHeader = {
  rows: DataRow[]
}

/*
* Recursions can be useful if any type of data has nested data that you have already modeled. So instead of rewriting the same piece of code over and over, you can just recall the current function you are in the begin the process over again BUT at a certain point that you want to start at. 
*
* In the example below, lets say we have a response from an API that contains nested data. In the nested data, there is a familiar structure and it goes on and on until nothing is left. 
* From here, we want to keep parsing data using the same function but start at a certain point that would start the process all over again and return the data once done. 
*
* */

const parseAPIResponse = (resp: DataHeader[]): DataPiece | undefined => {
  for(let i = 0; i < resp.length; i++){ 
    for(let j = 0; j < resp[i].rows.length; j++){
      const currentRow = resp[i].rows[j];
      for(let k = 0; k < currentRow.cols.length; k++){
        const currentCol = currentRow.cols[k];
        for(let h = 0; h < currentCol.data.length; h++){
          const currentData: DataPiece = currentCol.data[h];
          console.log(currentData.user);
          console.log(currentData.post);
          if(currentData.moreData && currentData.moreData.length >= 1){
            const data = parseAPIResponse(currentData.moreData);

            return data;
          } else {
            return currentData;
          }
        }
      }
    }
  }
}
