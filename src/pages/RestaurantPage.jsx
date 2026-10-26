import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/restaurants.js";
import restaurantsData from "../data/restaurants.js";
import { getAssetUrl } from "../utils/assets.js";
import { Heart, Share2 } from "lucide-react";

const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = React.useState(false);

  const restaurant = restaurantsData.find(r => r.id === parseInt(id));

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("eatmalawi_bookmarks") || "[]");
    setBookmarked(bookmarks.includes(restaurant?.id));
  }, [restaurant]);

  if (!restaurant) {
    return <div className="container">Restaurant not found</div>;
  }

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("eatmalawi_bookmarks") || "[]");
    const newBookmarks = bookmarked
      ? bookmarks.filter(bid => bid !== restaurant.id)
      : [...bookmarks, restaurant.id];

    setBookmarked(!bookmarked);
    localStorage.setItem("eatmalawi_bookmarks", JSON.stringify(newBookmarks));
  };

  const shareRestaurant = async () => {
    const baseUrl = "https://prodotlifik.github.io/eatmalawi";
    const path = `/restaurant/${restaurant.id}`;
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} in ${restaurant.city}!`,
      url: `${baseUrl}/?p=${encodeURIComponent(path)}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate("/")}
        className="btn-secondary"
        style={{
          marginBottom: 24,
          background: "none",
          border: "none",
          color: "var(--primary)",
          fontSize: 16,
          cursor: "pointer",
          padding: 0,
          fontWeight: 600
        }}
      >
        &larr; Back to restaurants
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
          marginBottom: 32,
          position: "relative"
        }}
      >
        <img
          src={getAssetUrl(restaurant.images[0])}
          alt={`${restaurant.name} - main view`}
          style={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            borderRadius: "var(--radius-md)"
          }}
        />

        <div style={{ display: "grid", gap: 16 }}>
          {restaurant.images.slice(1, 3).map((img, i) => (
            <img
              key={i}
              src={getAssetUrl(img)}
              alt={`${restaurant.name} - photo ${i + 2}`}
              style={{
                width: "100%",
                height: 190,
                objectFit: "cover",
                borderRadius: "var(--radius-md)"
              }}
            />
          ))}
        </div>

        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 8,
          zIndex: 10
        }}>
          <button
            onClick={shareRestaurant}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              padding: 0
            }}
            aria-label="Share"
          >
            <Share2 size={18} color="var(--text-main)" />
          </button>
          <button
            onClick={toggleBookmark}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              padding: 0
            }}
            aria-label="Bookmark"
          >
            <Heart
              size={18}
              fill={bookmarked ? "red" : "none"}
              color={bookmarked ? "red" : "var(--text-main)"}
            />
          </button>
        </div>
      </div>

      <h1 style={{ fontSize: 36, marginBottom: 8 }}>{restaurant.name}</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 18 }}>
        📍 {restaurant.location}
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>Menu</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20
          }}
        >
          {restaurant.menu.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: 16,
                background: "var(--bg-white)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <img
                src={getAssetUrl(item.image)}
                alt={item.name}
                loading="lazy"
                width="80"
                height="80"
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  flexShrink: 0
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <h4 style={{ margin: 0, fontSize: 16 }}>{item.name}</h4>
                  <span style={{ fontWeight: 700, color: "var(--primary)", fontSize: 14 }}>
                    {formatPrice(item.price)}
                  </span>
                </div>

                {item.description && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "var(--text-muted)",
                      lineHeight: 1.4
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: 32,
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-white)",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20
        }}
      >
        <div>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Book a table</h2>
          <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>
            Message us on WhatsApp to reserve your spot.
          </p>
        </div>

        <a
          href={`https://wa.me/${restaurant.bookingPhone.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          💬 {restaurant.bookingPhone}
        </a>
      </section>

      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Location</h2>
        <div
          style={{
            width: "100%",
            height: 350,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-color)"
          }}
        >
          <iframe
            title={`Map showing the location of ${restaurant.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              restaurant.location + ", Malawi"
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default RestaurantPage;
