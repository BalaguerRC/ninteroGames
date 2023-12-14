<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Sign In now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="last name"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-3">
            <button class="btn btn-warning">Sign In</button>
          </div>
        </form>
        <div
          style="padding-left: 32px; padding-right: 32px; padding-bottom: 32px"
        >
          <div class="form-control">
            <label class="label">
              <a href="login" class="label-text-alt link link-hover"
                >Do you have an account? Login</a
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
