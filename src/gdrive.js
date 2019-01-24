
// const updateSigninStatus = isSignedIn => {
//     console.log("updating status");
//     console.log(isSignedIn);

//     if (isSignedIn) {
//         gapi.client.drive.files.list({
//             'pageSize': 10,
//             'fields': "nextPageToken, files(id, name)"
//         }).then(response => {
//             console.log(response);
//         });
//     }
// };


// let gapi = window.gapi;
// let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
// let SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


// const initClient = () => gapi.client.init({
//     apiKey: "AIzaSyDXS3y1Rywhq04GBK3lctiC-2PEdeIxJKw",
//     clientId: "106070458255-2ljjmfcm2adqgqam4j4ie95f8lofh701.apps.googleusercontent.com",
//     discoveryDocs: DISCOVERY_DOCS,
//     scope: SCOPES
// }).then(() => {
//     console.log("loaded");
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
// }, console.error);

// gapi.load('client:auth2', initClient);