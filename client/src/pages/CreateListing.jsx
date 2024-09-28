import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../Firebase';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        // name: '',
        // description: '',
        // address: '',
        // type: 'rent',
        // bedrooms: 1,
        // bathrooms: 1,
        // regularPrice: 50,
        // discountPrice: 0,
        // offer: false,
        // parking: false,
        // furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImagesSubmit = async () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData(() => ({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                }));
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                setImageUploadError("Image upload error (2 MB max per image): " + error.message);
            })
        } else if (files.length > 6) {
            setImageUploadError("You can only upload 6 images per listing!");
            setUploading(false);
        } else {
            setImageUploadError("Please select an image to upload!");
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };


    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-center font-semibold text-3xl my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength={60} minLength={10} required />
                    <textarea type="text" placeholder='Description' id='description' className='border p-3 rounded-lg' required />
                    <input type="text" placeholder='Address' id='address' className='border p-3 rounded-lg' required />
                    <div className='flex gap-6 flex-wrap'>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='sell' />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='rent' />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='parking' />
                            <span>Parking spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='furnished' />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className='w-5' id='offer' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex gap-2 items-center">
                            <input type="number" id='bedrooms' min={10} max={10} required className='rounded-lg p-3 border border-gray-300' />
                            <p>Beds</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" id='bathrooms' min={10} max={10} required className='rounded-lg p-3 border border-gray-300' />
                            <p>Bathrooms</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <input type="number" id='regularprice' min={10} max={10} required className='rounded-lg p-3 border border-gray-300' />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" id='discountprice' min={10} max={10} required className='rounded-lg p-3 border border-gray-300' />
                            <div className="flex flex-col items-center">
                                <p>Discount Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                    <p className='font-semibold'>
                        Images
                        <span className='font-normal text-gray-600 ml-2'> The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded-lg w-full' type="file" id='images' accept='images/*' multiple />
                        <button disabled={uploading} onClick={handleImagesSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='size-20 object-cover rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button className='rounded-lg p-3 bg-slate-700 text-white disabled:opacity-80 hover:opacity-95'>Create Listing</button>
                </div>

            </form>
        </main>
    )
}
