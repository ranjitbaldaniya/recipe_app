import background from '../../images/bg-img/breadcumb4.jpg';
import logo from '../../images/core-img/logo.png';
import subscribBackground from '../../images/bg-img/bg1.jpg';

const ContactUs = () => {
  return (
    <>
      <div className="container mx-auto ">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="bg-cover h-44 container mx-auto  items-center my-10 text-white flex justify-center text-3xl font-semibold opacity-60"
        >
          <p>Recipe</p>
        </div>
        <div className="lg:mx-30">
          <img src={logo} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                pellentesque tortor. Aenean congue sed metus in iaculis. Cras a
                tortor enim.
              </p>
              <p>Phasellus posuere vestibulum ipsum, eget lobortis purus</p>
              <p>
                Orci varius natoque penatibus et magnis dis ac pellentesque
                tortor
              </p>
              <p>Aenean congue parturient montes, nascetur ridiculus mus.</p>
            </div>

            <div className="space-y-4">
              <p>
                <span className="text-[#40ba37] underline underline-offset-8 decoration-2">
                  Address:
                </span>
                <p className="mt-4">481 Creekside Lane Avila <br/> Beach, CA 93424</p>
              </p>
              <p>
                <span className="text-[#40ba37] underline underline-offset-8 decoration-2">
                  Phone:
                </span>
                <p className="mt-4">+53 345 7953 32453</p>
                <p className="mt-2">+53 345 7557 822112</p>
              </p>
              <p>
                <span className="text-[#40ba37] underline underline-offset-8 decoration-2">
                  Email:
                </span>
                <p className="mt-4">yourmail@gmail.com</p>
              </p>
            </div>
            <div>
              <div>
                <div
                  className="bg-cover h-95"
                  style={{ backgroundImage: `url(${subscribBackground})` }}
                >
                  <div className="p-5">
                    <p>
                      <input
                        type="text"
                        placeholder="Subscribe to newsletter"
                        className=" h-15 text-base px-5 font-semibold capitalize mt-10 "
                      />
                    </p>
                    <button className="lg:w-73 h-15 text-white text-base px-5 font-semibold capitalize mt-8 bg-[#40ba37]">
                      submit
                    </button>
                    <p className="mt-10 italic text-white text-xs">
                      Fusce nec ante vitae lacus aliquet vulputate. Donec
                      sceleri sque accumsan molestie. Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices posuere
                      cubilia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className='text-3xl text-black flex justify-center font-semibold py-10'>Get In Touch</p>
            <div className='flex justify-center'>
                <form className='space-y-5 ' >
                    <input type='text' className='py-3 px-10 lg:w-[500px] bg-[#f3f5f8] focus:outline-none' placeholder='Name'/>
                    <input type='email' className='py-3 px-10 lg:w-[500px] bg-[#f3f5f8] lg:ml-10 focus:outline-none' placeholder='Email' />
                    <input type='text' className='py-3 px-10 lg:w-[100%] bg-[#f3f5f8] focus:outline-none' placeholder='Subject'/>
                    <textarea  className='py-3 px-10 w-80 lg:w-[100%] bg-[#f3f5f8] focus:outline-none' placeholder='Message'/>
                    <div className='flex justify-center'>
                    <button className='py-4 px-15 bg-[#40ba37] text-white  items-center'>Send</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
