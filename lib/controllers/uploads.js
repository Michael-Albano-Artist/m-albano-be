const Router = require('express');
const { cloudinary } = require('../utils/cloudinary');

module.exports = Router()

  .get('/', async(req, res) => {
  
    try {
    const { resources } = await cloudinary.api.resources(
      {type: 'upload', prefix: 'm-albano', max_results: 100})
      // function(error, result) {console.log(error, result)})
    
    const response = resources.map(file => ({
      publicId: file.public_id,
      metadata: file.metadata
    }))
    
    res.send(response);
    
    } catch(error) {
        console.log(error)
    }
  })


  .post('/', async(req, res, next) => {

    try {
      const fileString = req.body.data;
      const metadata = req.body.metadata;
     
      await cloudinary.uploader.upload(fileString, {
        metadata,
        upload_preset: 'm-albano'
      });

      res.json({msg: 'yaaay!'})

    } catch (error) {
      console.log(error);
      res.status(500).json({err: 'uh-oh, someting went wrong!'})
    }
  })

  .delete('/', async(req, res, next) => {

    try {
      const publicId = req.body.publicId;
      await cloudinary.api.delete_resources([publicId],
        function(error, result) {console.log(error, result); });
      res.send(result);
    } catch (error) {
      res.status(500).json({err: 'whooops, that did not work!'})
    }
  })

  // .get('/image/:publicId', async(req, res, next) => {

  //   try {
  //     const publicId = req.params.publicId;
  //     const response = await cloudinary.api.resource('m-albano/events/hotsr8yatzendqyfbbb3', {type: 'upload'},
  //       function(error, result) {console.log(error, result); });
  //     res.send(response);
  //   } catch (error) {
  //     res.status(500).json({err: 'whooops, that did not work!'})
  //   }
  // })

  .get('/events', async(req, res) => {
  
    try {
    const { resources } = await cloudinary.api.resources(
      {type: 'upload', prefix: 'm-albano/events', max_results: 100},
      function(error, result) {console.log(error, result)})
    
    const response = resources.map(file => ({
      publicId: file.public_id,
      metadata: file.metadata
    }))
    
    res.send(response);
    
    } catch(error) {
        console.log(error)
    }
  })

  .post('/update', async(req, res, next) => {

    try {
      const publicId = req.body.publicId;
      const metadata = req.body.metadata;
      await cloudinary.api.update(publicId, { metadata });
    } catch (error) {
      console.log(error);
      res.status(500).json({err: 'uh-oh, someting went wrong!'});
    }
  })

  .post('/events', async(req, res, next) => {

    try {
      const fileString = req.body.data;
      const metadata = req.body.metadata;
      await cloudinary.uploader.upload(fileString, {
        metadata,
        upload_preset: 'albano-events'
      });

      res.json({msg: 'yaaay!'})

    } catch (error) {
      console.log(error);
      res.status(500).json({err: 'uh-oh, someting went wrong!'})
    }
  })
