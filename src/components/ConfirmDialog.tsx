import Swal from 'sweetalert2';

export const showConfirmDialog = async ({
    title = "Are you sure?",
    text = "This action cannot be undone.",
    confirmButtonText = "Yes, confirm it",
    cancelButtonText = "Cancel",
}: {
    title?: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
} = {}) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText,
        cancelButtonText,
    });

    return result.isConfirmed;
};
