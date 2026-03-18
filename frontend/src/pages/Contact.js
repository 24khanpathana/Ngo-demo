import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/content`
        );

        const contactData = res.data.filter(
          (item) => item.page === "Contact"
        );

        setContent(contactData);
      } catch (error) {
        console.error("Error fetching contact content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Loading Contact Information...</h2>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">
        Contact Information
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {content.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-3 text-gray-600 whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;