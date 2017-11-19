<template>
  <div>
    <div id='map-cluster' class='map'></div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  let map

  function successFunc (data) {
    if (map !== undefined || map != null) {
      map.off()
      map.remove()
    }

    // eslint-disable-next-line no-undef
    L.mapbox.accessToken = 'pk.eyJ1IjoiYnJ1Y2VsZWUiLCJhIjoiQkZtY0dJMCJ9.a7zFI-MdJbKT9SGLSDFHeQ'
    // eslint-disable-next-line no-undef
    map = L.mapbox.map('map-cluster', 'mapbox.streets', {attributionControl: false, infoControl: true})
    map.scrollWheelZoom.disable()
    // eslint-disable-next-line no-undef
    var clusterLayer = new L.MarkerClusterGroup()
    map.addLayer(clusterLayer)

    clusterLayer.clearLayers()

    data.forEach(function (d) {
      // eslint-disable-next-line no-undef
      var marker = L.marker([d.lat, d.lng])
      // var name = d.id
      // marker.bindPopup("<p>" + name + "</p>")

      /* SVG to Image Base64 String */
      // findDOMNode(refs.markerTemplate).style.fill = getColor()//Colors.green500
      // findDOMNode(refs.markerTemplate).style.fill = _.sample(Colors)
      // var svgString = new XMLSerializer().serializeToString(findDOMNode(refs.markerTemplate))
      // var iconUrl = "data:image/svg+xmlbase64," + btoa( svgString )

      // eslint-disable-next-line no-undef
      marker.setIcon(L.icon({
        // 'marker-color': '#cea',
        // "iconUrl": 'http://design.ubuntu.com/wp-content/uploads/ubuntu-logo32.png',
        // "iconUrl": 'http://gismaps.collincountytx.gov/newimages/LocationMarker.gif',
        // "iconUrl": 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png',
        'iconUrl': require('@/assets/placeIcon.png'),
        // "iconUrl": iconUrl,
        'iconSize': [30, 30], // size of the icon
        'iconAnchor': [15, 15] // point of the icon which will correspond to marker's location
      }))

      // const popup = '<div>' +
      //   renderAttributes({
      //     // attrs,
      //     target: {
      //       name: name,
      //       color: _.sample(Colors),
      //     }
      //   }) +
      // '</div>'

      // marker.bindPopup("<p>" + name + "</p>")

      // breweryMarkers.addLayer(marker)
      clusterLayer.addLayer(marker)
    })
    // map.addLayer(breweryMarkers)
    // map.fitBounds(breweryMarkers.getBounds())
    map.addLayer(clusterLayer)
    map.fitBounds(clusterLayer.getBounds())
  }

  export default {
    mounted () {
      require('mapbox.js')
      require('leaflet.markercluster')
      require('leaflet.markercluster/dist/MarkerCluster.css')
      require('leaflet.markercluster/dist/MarkerCluster.Default.css')

      var config = {
        apiKey: 'AIzaSyCo_J9x_G34-dOvsM4AhFonDjxRyk_QpAE',
        authDomain: 'beiersdorf-8b824.firebaseapp.com',
        databaseURL: 'https://beiersdorf-8b824.firebaseio.com',
        projectId: 'beiersdorf-8b824',
        storageBucket: 'beiersdorf-8b824.appspot.com',
        messagingSenderId: '181032480119'
      }

      let firebaseApp

      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp(config)
      } else {
        firebaseApp = firebase.apps[0]
      }

      var rootRef = firebaseApp.database().ref()
      var path = '/data'
      var dataRef = rootRef.child(path)
      var readRequest = dataRef.once('value')

      let data

      readRequest.then(function (snapshot) {
        var resultById = snapshot.val()
        var fakeId = 'uselessData'
        delete resultById[fakeId]
        var ids = Object.keys(resultById)
        data = ids.map(function (id) {
          return resultById[id]
        })

        successFunc(data)
      })

      dataRef.on('child_added', function (readDataSnapshotAdded, prevChildKey) {
        const latestData = readDataSnapshotAdded.val()

        if (data && latestData.createdAt) {
          data.push(latestData)
          successFunc(data)
        }
      })
    }
  }
</script>

<style>
  .map {
    --header-height: 60px;
    --footer-height: 60px;
    position: absolute;
    top: var(--header-height);
    bottom: 0;
    width: 100vw;
    height: calc(100vh - var(--header-height) - var(--footer-height))
  }
</style>
