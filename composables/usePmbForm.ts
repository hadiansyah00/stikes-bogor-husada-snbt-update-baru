export function usePmbForm() {
  const isSubmitting = ref(false);
  const success = ref(false);

  async function submit(data: any) {
    if (isSubmitting.value) return;

    isSubmitting.value = true;

    try {
      await $fetch("/api/wa/send-pmb", {
        method: "POST",
        body: data,
      });

      success.value = true;
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    submit,
    success,
    isSubmitting,
  };
}
