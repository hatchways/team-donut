// route/api/profile.js
const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */

const router = express.Router();
require('dotenv').config()

/**
 * PROFILE IMAGE STORING STARTS
 */

const s3 = new aws.S3({
    accessKeyId: 'AKIAQSY2CO7MMRGX4THW',
    secretAccessKey: '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',
    Bucket: 'babyregistry101'
});

/**
 * Multiple Upload
 */
const multipleFileUpload = multer({
  storage: multerS3({
  s3: s3,
  bucket: 'babyregistry101',
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, path.basename(file.originalname, 
      path.extname( file.originalname ) ) + '-' 
      + Date.now() + path.extname( file.originalname ) )
  }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
  }
}).array('imageGallery', 4);
/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
}
/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/multiple-file-upload', ( req, res ) => {

  multipleFileUpload( req, res, ( error ) => {
      if( error ){
        res.json( { error: error } );
      } else {
        // If File not found
        if(req.files === undefined){
          res.json( 'Error: No File Selected' );
        } else {
            // If Success
            let fileArray = req.files,
                fileLocation;
            const galleryImgLocationArray = [];
            for ( let i = 0; i < fileArray.length; i++ ) {
                fileLocation = fileArray[ i ].location;
                galleryImgLocationArray.push( fileLocation )
            }
            // Save the file name into database
            res.json({
              filesArray: fileArray,
              locationArray: galleryImgLocationArray
            });
        }
      }
  });

});

module.exports = router;
    