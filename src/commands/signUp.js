module.exports = ctx => {
    console.log(ctx.scene);
    return ctx.scene.enter('sign-up');
}
