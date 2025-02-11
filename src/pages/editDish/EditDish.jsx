import Trash from "../../assets/trash.png";
import Camera from "../../assets/camera.png";
import Dish from "../../assets/Food.png";
import Soup from "../../assets/soup.png";
import Weight from "../../assets/weight scale.png";
import Tag from "../../assets/tag-2.png";
import { useState, useEffect } from "react";
import { apiGet, apiPut, apiDelete } from "../../utils/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditDish = () => {
  const navigate = useNavigate();
  const [dishImageFile, setDishImageFile] = useState(null);
  const { id } = useParams();
  const [dishImage, setDishImage] = useState("");
  const [dish, setDish] = useState({
    dishName: "",
    dishCategory: "",
    measurement: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet(`/dishes/${id}`);
        setDish(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [id]);

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDishImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setDishImageFile(file);
    } else {
      setDishImage("");
      setDishImageFile(null);
    }
  };


  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this dish!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDelete(`/dishes/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Dish deleted successfully',
          });
          navigate('/admin-dashboard');
        } catch (error) {
          console.log(error.response.data);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while deleting the dish. Please try again later.',
          });
        }
      }
    });
  };

  const handleInputChange = (event) => {
    setDish({
      ...dish,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    //   const formData = new FormData();
    // formData.append('image', dishImageFile);
    // formData.append('dishName', dish.dishName);
    // formData.append('dishCategory', dish.dishCategory);
    // formData.append('measurement', dish.measurement);
    // formData.append('price', dish.price);

    const updatedDish = {
      ...dish,
      image: dishImage,
    };
    try {
      //  await apiPut(`/dishes/${id}`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      await apiPut(`/dishes/${id}`, updatedDish);
      
      Swal.fire({
        html: `
            <div style="text-align: center;">
              <img src="https://res.cloudinary.com/dmfb370xe/image/upload/v1708422224/to-do_list_ap03fj.png" alt="Uploaded Dish" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
              <p style="color: #4990ef; margin-top: 20px;">New Dish Uploaded Successfully!</p>
            </div>
          `,
        showCancelButton: false,
        confirmButtonColor: "#2f80ed",
        confirmButtonText: "Continue",
        customClass: {
          confirmButton: "swal-button-width",
        },
      }).then(() => {
        console.log("Modal dismissed");

        navigate("/admin-dashboard");
      });
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while uploading the dish. Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-4/5 md:w-1/3 h-5/6  bg-white">
        <div className="flex justify-end items-center p-6 pb-2">
          <img
            src={Trash}
            alt="dish"
            className="w-6 h-6 justify-end cursor-pointer rounded-xl"
            onClick={handleDelete}
          />
        </div>
        <h1 className="text-blue-500 text-center font-semibold text-2xl">
          New Dish
        </h1>
        <div className="flex flex-col items-center relative rounded-full">
          <img
            src={dishImage || dish.imageUrl}
            alt={dish.dishName}
            className="h-28 w-24 rounded-full object-cover"
          ></img>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
          />
          <img
            src={Camera}
            className="h-5 w-5 absolute bottom-0 left-1/2 transform -translate-x-1/2 md:left-64 md:-translate-x-0 cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()}
          />
        </div>
        <div className="flex flex-col  ml-16 mt-3 w-9/12 h-1/2 ">
          <label
            htmlFor="dishName"
            className="text-sm text-blue-500 pb-1 font-medium "
          >
            Dish
          </label>
          <div className="relative">
            <img
              src={Dish}
              alt="dish"
              className="absolute w-6 h-6 left-2 top-1/3 transform -translate-y-1/2 rounded-xl"
            />
            <input
              type="text"
              id="dishName"
              name="dishName"
              placeholder="Efo Riro"
              className="bg-gray-200 rounded-md h-8 mb-4 pl-12 w-full"
              value={dish.dishName}
              onChange={handleInputChange}
            />
          </div>
          <label
            htmlFor="dishCategory"
            className="text-sm text-blue-500 pb-1 font-medium "
          >
            Dish category
          </label>
          <div className="relative">
            <img
              src={Soup}
              alt="dish"
              className="absolute w-6 h-6 left-2 top-1/3  transform -translate-y-1/2 rounded-xl"
            />
            <select
              id="dishCategory"
              name="dishCategory"
              className="bg-gray-200 rounded-md h-8 mb-4 pl-12 w-full appearance-none"
              value={dish.dishCategory}
              onChange={handleInputChange}
            >
              <option>Select Category</option>
              <option>Soup and stews</option>
              <option>Trending</option>
              <option>Rice Dishes</option>
              <option>Grilled and Roasted Foods</option>
            </select>
          </div>
          <label
            htmlFor="dishName"
            className="text-sm text-blue-500 pb-1 font-medium "
          >
            Measurement/Size
          </label>
          <div className="relative">
            <img
              src={Weight}
              alt="dish"
              className="absolute w-6 h-6 left-2 top-1/3  transform -translate-y-1/2 rounded-xl"
            />
            <input
              type="text"
              id="measurement"
              name="measurement"
              placeholder="500kg"
              className="bg-gray-200 rounded-md h-8  mb-4 pl-12 w-full"
              value={dish.measurement}
              onChange={handleInputChange}
            />
          </div>
          <label
            htmlFor="dishName"
            className="text-sm text-blue-500 pb-1 font-medium "
          >
            Price
          </label>
          <div className="relative">
            <img
              src={Tag}
              alt="dish"
              className="absolute w-6 h-6 left-2 top-1/3  transform -translate-y-1/2 rounded-xl"
            />
            <input
              type="text"
              id="price"
              name="price"
              placeholder="₦100,000"
              className="bg-gray-200 rounded-md h-8  mb-4 pl-12 w-full"
              value={dish.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-6">
          <button className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500 border w-1/3 h-9 rounded-lg transition duration-300 ease-in"
          onClick={handleCancel}>
          
            Cancel
          </button>

          <button
            className="bg-blue-500 text-white w-1/3 h-9 rounded-lg transition duration-300 ease-in hover:bg-white hover:text-blue-500 hover:border-blue-500 border"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDish;
