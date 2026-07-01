import { useEffect, useState } from "react";
import {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} from "../api/coupons"

export default function useCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoupons = async () => {
        setLoading(true);

        try {
            const res = await getCoupons();
            setCoupons(res.data);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    // const addCoupon = async (data) => {
    //     try {
    //         await createCoupon(data);
    //         fetchCoupons();
    //     } catch (error) {
    //         console.error("Error creating coupon:", error);
    //     }
    // };

    const addCoupon = async (data) => {
        try {
            const res = await createCoupon(data);

            setCoupons(prev => [...prev, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    // const editCoupon = async (id, data) => {
    //     try {
    //         await updateCoupon(id, data);
    //         fetchCoupons();
    //     } catch (error) {
    //         console.error("Error updating coupon:", error);
    //     }
    // };

    const editCoupon = async (id, data) => {
        try {
            const res = await updateCoupon(id, data);

            setCoupons(prev =>
                prev.map(coupon =>
                    coupon.id === id ? res.data : coupon
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const removeCoupon = async (id) => {
        try {
            await deleteCoupon(id);

            setCoupons(prev =>
                prev.filter(coupon => coupon.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    // const removeCoupon = async (id) => {
    //     try {
    //         await deleteCoupon(id);
    //         fetchCoupons();
    //     } catch (error) {
    //         console.error("Error deleting coupon:", error);
    //     }
    // };

    return {
        coupons,
        loading,
        fetchCoupons,
        addCoupon,
        editCoupon,
        removeCoupon,
    };
}