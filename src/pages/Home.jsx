import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/Card.jsx";
import { Heart, Share2 } from "lucide-react";
import { supabase } from "../supabaseClient";
import restaurantsData from "../data/restaurants.js";

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [city, setCity] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("eatmalawi_bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*');

        if (error) throw error;
        
        // Merge Supabase data with local data to ensure images are present
        const mergedData = (data || []).map(supabaseRest => {
          const localRest = restaurantsData.find(lr => lr.id === supabaseRest.id);
          return {
            ...supabaseRest,
            image: supabaseRest.image || localRest?.image || '/featured/placeholder.jpg',
            images: supabaseRest.images || localRest?.images || []
          };
        });

        setRestaurants(mergedData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        // Fallback to purely local data if Supabase fails completely
        setRestaurants(restaurantsData);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(bid => bid !== id)
      : [...bookmarks, id];
    setBookmarks(newBookmarks);
    localStorage.setItem("eatmalawi_bookmarks", JSON.stringify(newBookmarks));
  };

  const shareRestaurant = async (e, restaurant) => {
    e.stopPropagation();
    const baseUrl = "https://lawi.netlify.app";
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} in ${restaurant.city}!`,
      url: `${baseUrl}/restaurant/${restaurant.id}`,
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

  const cities = useMemo(() => {
    return [...new Set(restaurants.map(r => r.city))].sort();
  }, [restaurants]);

  const cuisines = useMemo(() => {
    return [...new Set(restaurants.map(r => r.cuisine))].sort();
  }, [restaurants]);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesCity = city
        ? r.city === city
        : true;
      const matchesCuisine = cuisine
        ? r.cuisine === cuisine
        : true;
      const matchesFavorites = showFavorites
        ? bookmarks.includes(r.id)
        : true;
      return matchesCity && matchesCuisine && matchesFavorites;
    });
  }, [restaurants, city, cuisine, bookmarks, showFavorites]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: 18,
        color: "var(--text-muted)"
      }}>
        Loading restaurants...
      </div>
    );
  }

  return (
    <main>
      <section className="hero-section">
        <h1 className="hero-title">Stop Guessing. Start Eating.</h1>
        <p className="hero-subtitle">Current menus. Up to date info. No more outdated lists and old Facebook posts.</p>
        <a href="#explore" className="btn-primary">Find a Restaurant</a>
      </section>

      <div id="explore" className="container">
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          Explore Restaurants
        </h2>

        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
          Find places to eat and view their menus in one place.
        </p>

        <div
          style={{
            marginBottom: 16,
            background: "var(--bg-white)",
            padding: "4px",
            borderRadius: 999,
            border: "1px solid var(--border-color)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            boxShadow: "var(--shadow-sm)",
            overflow: "hidden"
          }}
        >
          <select
            aria-label="Filter restaurants by city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: city ? "var(--text-main)" : "var(--text-muted)",
              background: "transparent",
              cursor: "pointer",
              padding: "12px 8px",
              appearance: "none",
              WebkitAppearance: "none",
              borderRight: "1px solid var(--border-color)",
              textAlign: "center"
            }}
          >
            <option value="">📍 Search by location</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            aria-label="Filter restaurants by cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: cuisine ? "var(--text-main)" : "var(--text-muted)",
              background: "transparent",
              cursor: "pointer",
              padding: "12px 8px",
              appearance: "none",
              WebkitAppearance: "none",
              textAlign: "center"
            }}
          >
            <option value="">🍲 Search by cuisine</option>
            {cuisines.map(cu => (
              <option key={cu} value={cu}>{cu}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            style={{
              background: showFavorites ? "var(--primary)" : "var(--bg-white)",
              color: showFavorites ? "white" : "var(--text-muted)",
              border: `1px solid ${showFavorites ? "var(--primary)" : "var(--border-color)"}`,
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <Heart size={14} fill={showFavorites ? "white" : "none"} />
            {showFavorites ? "Showing Favorites" : "Show Favorites"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 16, padding: "24px 0" }}>
            No restaurants match your search. Try a different name or city.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24
            }}
          >
        {filtered.map((r) => {
          const imageUrl = r.image ? (r.image.startsWith('/') ? r.image : `/featured/${r.image}`) : '/featured/placeholder.jpg';
          console.log(`DEBUG: Restaurant: ${r.name}, Image URL: ${imageUrl}`);
          return (
            <Card key={r.id} onClick={() => navigate(`/restaurant/${r.id}`)}>
              <div style={{ position: "relative" }}>
                <img
                  src={imageUrl}
                  alt={r.name}
                  loading="lazy"
                  width="300"
                  height="300"
                  style={{ width: "100%", height: 240, objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  gap: 8,
                  zIndex: 10
                }}>
                  <button
                    onClick={(e) => shareRestaurant(e, r)}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      padding: 0
                    }}
                    aria-label="Share"
                  >
                    <Share2 size={16} color="var(--text-main)" />
                  </button>
                  <button
                    onClick={(e) => toggleBookmark(e, r.id)}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
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
                      size={16}
                      fill={bookmarks.includes(r.id) ? "red" : "none"}
                      color={bookmarks.includes(r.id) ? "red" : "var(--text-main)"}
                    />
                  </button>
                </div>
              </div>
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{r.name}</h3>
                  <span style={{ fontSize: 12, background: "var(--primary)", padding: "2px 8px", borderRadius: 4, color: "white", fontWeight: 600 }}>
                    View Menu
                  </span>
                </div>
                <p
                  style={{
                    margin: "8px 0",
                    fontSize: 14,
                    color: "var(--text-muted)",
                    lineHeight: 1.5
                  }}
                >
                  {r.description}
                </p>
                <p style={{ color: "var(--primary)", fontSize: 14, fontWeight: 500 }}>
                  📍 {r.location}
                </p>
              </CardContent>
            </Card>
          );
        })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
