import Image from "next/image";
import Link from "next/link";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  section: string;
  link: string[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Pages",
    link: ["Blogs", "Reviews", "About", "Contact Us"],
  },
  {
    id: 2,
    section: "Services",
    link: ["Career Map", "Job Seeker", "Salary Predictor", "Degree Matcher" , "Consultations"],
  },
];

const footer = () => {
  return (
    <div className="bg-black" id="first-section">
      <div className="mx-auto max-w-2xl pt-5 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}
          <div className="col-span-4">
            <h3 className="text-white text-4xl font-semibold leading-9 mb-4 lg:mb-20">
              Skillify
            </h3>
            <div className="flex gap-4">
              <div className="footer-icons">
                <Link href="http://www.youtube.com/@skillify-inc">
                  <Image
                    src={"/images/footer/youtube.svg"}
                    alt="youtube"
                    width={20}
                    height={20}
                    className="grayscale"
                  />
                </Link>
              </div>
              <div className="footer-icons">
                <Link href="https://www.linkedin.com/company/skillify-inc/posts/?feedView=all&viewAsMember=true">
                  <Image
                    src={"/images/footer/linkedin.svg"}
                    alt="Linkedin"
                    width={20}
                    height={20}
                    className="grayscale"
                  />
                </Link>
              </div>
              <div className="footer-icons">
                <Link href="https://www.instagram.com/skillify.inc/?next=%2F#">
                  <Image
                    src={"/images/footer/instagram.svg"}
                    alt="instagram"
                    width={20}
                    height={20}
                    className="grayscale"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* COLUMN-2/3 */}
          <div className="space-y-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col space-x-0 relative"
              >
                <p className="text-white text-xl font-extrabold mb-9">
                  {product.section}
                </p>
                <ul className="flex space-x-32 flex-auto">
                  {product.link.map((link: string, index: number) => {
                    let href = "/"; // Default link
                    if (link === "Blogs") href = "/blogs"; // Link to Blogs page
                    if (link === "Reviews") href = "/Reviews"; // Link to Reviews page
                    if (link === "About") href = "/about"; // Link to About page
                    if (link === "ContactUs") href = "/ContactUs"; // Link to Contact page

                    return (
                      <li key={index} className="mb-5">
                        <Link
                          href={href}
                          className="text-white relative text-lg font-normal w-10 mb-6 space-links"
                        >
                          {link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Rights Reserved */}
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-solid border-t border-footer">
          <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
            <div>
              <h3 className="text-center md:text-start text-offwhite text-lg">
                @2023 - All Rights Reserved by{" "}
                <Link href="https://adminmart.com/" target="_blank">
                  Skillify
                </Link>
              </h3>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/privacy-policy">
                <h3 className="text-offwhite pr-6">Privacy policy</h3>
              </Link>
              <Link href="/terms-conditions">
                <h3 className="text-offwhite pl-6 border-solid border-l border-footer">
                  Terms & conditions
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
