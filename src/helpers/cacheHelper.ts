export class CacheHelper {
    hashKey(input: any) {
        let router = '';
        if (input) {
            router = JSON.stringify(input);

            router = router.replace(/:/g, '');
            router = router.replace(/\\/g, '');
            router = router.replace(/"/g, '');
            router = router.replace(/{/g, '');
            router = router.replace(/}/g, '');
            router = router.replace(/\[/g, '');
            router = router.replace(/\]/g, '');
            router = router.replace(/,/g, '');
        }

        return router;
    }
}
