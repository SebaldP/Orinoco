async function getUrl(url){
    const settingsGet= {
    method: 'GET',
    headers: {'Content-Type':'application/json'}
    }
    return fetch(url, settingsGet)
    .then(response => response.json())
    //.then(data => console.log(data))
    //.catch(error => console.log('Une erreur est survenue:' + error));
}