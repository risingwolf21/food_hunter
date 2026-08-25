import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import { useRestaurant } from "@/tanstack/restaurants";
import { Navigate, useParams } from "react-router-dom";
import { RestaurantPage } from "./restaurant-page";


export function RestaurantPageProvider() {

    const { user } = useAuth();

    const { restaurantId } = useParams();

    if (!restaurantId) return <Navigate to={"/"} />;

    const { data: restaurant, isLoading, error } = useRestaurant(restaurantId, user.id)

    if (isLoading)
        return <Spinner />

    if (!restaurant) {
        return <Navigate to={"/"} />;
    }

    return <RestaurantPage restaurant={restaurant} isLoading={isLoading} error={error} />

}